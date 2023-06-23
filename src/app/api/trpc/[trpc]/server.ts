import { PrismaClient } from '@prisma/client'
import { initTRPC, TRPCError } from '@trpc/server';
import { uuid } from 'uuidv4';
import { z } from 'zod';
import { EmployeeSchema, FlightSchema, LoginRequestPayload, PartnerSchema, PartnerSchemaPartial, ScoreSchema, ScoreValues, UserSchema } from '@/app/api/schema'

const t = initTRPC.create();
const publicProcedure = t.procedure;
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
})

export const appRouter = t.router({
  hello: publicProcedure
    .query(() => 'Ola World'),

  login: publicProcedure
    .input(LoginRequestPayload)
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({ where: { username: input.username } })
      if (user?.password !== input.password) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid username or password' })
      }
      return { user, token: uuid() }
  }),


  // Employee
  findEmployee: publicProcedure
    .input(z.object({
      param: z.object({
        regNum: z.string()
      })
    })).query(async ({ input }) => await prisma.employee.findUnique({ where: { registerNumber: input.param.regNum } })),

  listEmployee: publicProcedure
    .query(async () => await prisma.employee.findMany({ include: { user: true, address: true } })),

  createEmployee: publicProcedure
    .input(EmployeeSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          username: input.username,
          password: input.password,
          role: input.role,
        }
      })
      const address = await prisma.address.create({ data: input.address })

      const employee = await prisma.employee.create({
        data: {
          name: input.name,
          document: input.document,
          registerNumber: input.registerNumber,
          birthDate: input.birthDate,
          userId: user.id, addressId: address.id
        }
      })
    }),

  updateEmployee: publicProcedure
    .input(z.object({
      param: z.object({
        regNum: z.string()
      }),
      body: EmployeeSchema.deepPartial()
    }))
    .mutation(async ({ input }) => {
      const param = input.param;
      const data = input.body;

      const employee = await prisma.employee.update({
        data: {
          name: data.name,
          document: data.document,
          registerNumber: data.registerNumber,
          birthDate: data.birthDate,
        }, where: {
          registerNumber: param.regNum
        }
      })
      // It can't update user
      const address = await prisma.address.update({ data: data.address ?? {}, where: { id: employee.addressId } })
    }),

  deleteEmployee: publicProcedure
    .input(z.object({
      params: z.object({
        regNum: z.string()
      })
    }))
    .mutation(async ({ input }) => {
      await prisma.employee.delete({ where: { registerNumber: input.params.regNum } })
    }),

  // Partner
  findPartner: publicProcedure
    .input(z.object({
      param: z.object({
        regNum: z.string()
      })
    })).query(async ({ input }) => await prisma.partner.findUnique({ where: { registerNumber: input.param.regNum } })),

  listPartner: publicProcedure.query(async () => await prisma.partner.findMany({ include: { user: true, address: true } })),

  createPartner: publicProcedure
    .input(PartnerSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          username: input.username,
          password: input.password,
          role: input.role,
        }
      })
      const address = await prisma.address.create({ data: input.address })

      const partner = await prisma.partner.create({
        data: {
          name: input.name,
          document: input.document,
          registerNumber: input.registerNumber,
          birthDate: input.birthDate,
          email: input.email,
          userId: user.id, addressId: address.id,

          ...(input.type == 'instructor' ? {
            license: input.license,
            course: input.course,
            graduationDate: input.graduationDate,
            institution: input.institution,
          } : input.type == 'pilot' ? {
            license: input.license,
          } : {})
        }
      })
    }),

  updatePartner: publicProcedure
    .input(z.object({
      param: z.object({
        regNum: z.string()
      }),
      body: PartnerSchemaPartial,
    }))
    .mutation(async ({ input }) => {
      const param = input.param;
      const data = input.body;

      const partner = await prisma.partner.update({
        data: {
          name: data.name,
          document: data.document,
          registerNumber: data.registerNumber,
          birthDate: data.birthDate,
          email: data.email,
          ...(data.type == 'instructor' ? {
            license: data.license,
            course: data.course,
            graduationDate: data.graduationDate,
            institution: data.institution,
          } : data.type == 'pilot' ? {
            license: data.license,
          } : {})
        }, where: {
          registerNumber: param.regNum
        }
      })
      // It can't update user
      const address = await prisma.address.update({ data: data.address ?? {}, where: { id: partner.addressId } })
    }),

  deletePartner: publicProcedure
    .input(z.object({
      params: z.object({
        regNum: z.string()
      })
    }))
    .mutation(async ({ input }) => {
      await prisma.partner.delete({ where: { registerNumber: input.params.regNum } })
    }),

  // Flight
  listFlight: publicProcedure
    .input(z.object({
      param: z.object({
        pilotLicence: z.string().optional(),
        studentRegistrationNumber: z.string(),
      })
    })).query(async ({ input }) =>
      await prisma.flight.findMany({
        include: { pilot: true, student: true },
        where: {
          OR: [{
            pilot: {
              licence: input.param.pilotLicence
            }
          }, {
            student: {
              registerNumber: input.param.studentRegistrationNumber
            }
          }]
        }
      })),

  summaryLessonFlights: publicProcedure.input(
    z.object({
      param: z.object({
        studentRegistrationNumber: z.string()
      })
    })).query(async ({ input }) => {
      const flights = await prisma.flight.findMany({
        include: { pilot: true, student: true },
        where: {
          student: {
            registerNumber: input.param.studentRegistrationNumber
          }
        }
      })

      const valueToScore = (v: number) => ScoreValues[Math.floor(v)]
      const scoreToValue = (s: ScoreSchema) => ScoreValues.indexOf(s)

      const totalDurationMs = flights.reduce((acc, flight) => acc + (flight.endAt.getTime() - flight.startAt.getTime()), 0)
      const totalDurationHr = totalDurationMs / (1000 * 60 * 60)

      const sumScoreValues = flights.reduce((acc, flight) => acc + scoreToValue(ScoreSchema.parse(flight.score!!)), 0)
      const averageScore = sumScoreValues / flights.length

      return {
        flightHours: totalDurationHr,
        averageScore: valueToScore(averageScore),
        allowLicence: totalDurationHr >= 150 && averageScore >= scoreToValue(ScoreSchema.enum.B),
      }
    }),

  createFlight: publicProcedure
    .input(FlightSchema)
    .mutation(async ({ input }) => {

      const pilot = await prisma.partner.findUnique({ where: { licence: input.pilotLicence } })

      if (pilot == null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `pilot ${input.pilotLicence} not found`
        })
      }

      const isLesson = input.type == 'lesson'
      const student = isLesson ? (await prisma.partner.findUnique({ where: { registerNumber: input.studentRegistrationNumber } })) : undefined

      if (isLesson && student == null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `student ${input.studentRegistrationNumber} not found`
        })
      }

      const flight = await prisma.flight.create({
        data: {
          slug: uuid(),
          pilotId: pilot.id,
          startAt: input.startAt,
          endAt: input.endAt,

          ...(isLesson ? {
            score: input.score!!,
            studentId: student!!.id,
          } : {})
        },
      })
    }),

  // updateFlight: undefined,

  deleteFlight: publicProcedure
    .input(z.object({
      params: z.object({
        slug: z.string()
      })
    })).mutation(async ({ input }) => {
      await prisma.flight.delete({ where: { slug: input.params.slug } })
    }),
});

export type AppRouter = typeof appRouter;
