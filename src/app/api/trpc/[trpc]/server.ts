import { prisma } from './prisma'
import { initTRPC, TRPCError } from '@trpc/server';
import { uuid } from 'uuidv4';
import { z } from 'zod';
import { EmployeeCreateRequestPayload, EmployeeSchema, FlightSchema, LoginRequestPayload, PartnerCreateRequestPayload, StudentCreateRequestPayload, PartnerSchemaPartial, ScoreSchema, ScoreValues, UserSchema, PilotCreateRequestPayload, InstructorCreateRequestPayload } from '@/app/api/schema'

const t = initTRPC.create();
const publicProcedure = t.procedure;

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
      params: z.object({
        regNum: z.string()
      })
    })).query(async ({ input }) => await prisma.employee.findUnique({ where: { registerNumber: input.params.regNum }, include: { user: true, address: true } })),

  listEmployee: publicProcedure
    .query(async () => await prisma.employee.findMany({ include: { user: true, address: true } })),

  createEmployee: publicProcedure
    .input(EmployeeCreateRequestPayload)
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          username: input.username,
          password: input.password,
          role: 'employee',
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
      params: z.object({
        regNum: z.string()
      })
    })).query(async ({ input }) => await prisma.partner.findUnique({ where: { registerNumber: input.params.regNum }, include: { user: true, address: true } })),

  listPartner: publicProcedure.query(async () => await prisma.partner.findMany({ include: { user: true, address: true } })),

  updateStudentToPilot: publicProcedure
    .input(z.object({
      params: z.object({
        regNum: z.string()
      }),
      body: z.object({
        license: z.string()
      })
    }))
    .mutation(async ({ input }) => {
      await prisma.partner.update({
        where: { registerNumber: input.params.regNum },
        data: {
          license: input.body.license,
          user: { update: { role: 'pilot' } }
        }
      })
    }),

  createStudent: publicProcedure
    .input(StudentCreateRequestPayload)
    .mutation(async ({ input }) => {
      await prisma.partner.create({
        data: {
          name: input.name,
          document: input.document,
          registerNumber: input.registerNumber,
          birthDate: input.birthDate,
          email: input.email,
          user: {
            create: {
              username: input.username,
              password: input.password,
              role: 'student',
            }
          },
          address: {
            create: input.address
          }
        }
      })
    }),

  createPilot: publicProcedure
    .input(PilotCreateRequestPayload)
    .mutation(async ({ input }) => {
      await prisma.partner.create({
        data: {
          name: input.name,
          document: input.document,
          registerNumber: input.registerNumber,
          birthDate: input.birthDate,
          email: input.email,
          license: input.license,
          user: {
            create: {
              username: input.username,
              password: input.password,
              role: 'pilot',
            }
          },
          address: {
            create: input.address
          }
        }
      })
    }),

  createInstructor: publicProcedure
    .input(InstructorCreateRequestPayload)
    .mutation(async ({ input }) => {
      await prisma.partner.create({
        data: {
          name: input.name,
          document: input.document,
          registerNumber: input.registerNumber,
          birthDate: input.birthDate,
          email: input.email,
          license: input.license,
          course: input.course,
          graduationDate: input.graduationDate,
          institution: input.institution,
          user: {
            create: {
              username: input.username,
              password: input.password,
              role: 'instructor',
            }
          },
          address: {
            create: input.address
          }
        }
      })
    }),

  /*
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
    */

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
    .query(async () =>
      await prisma.flight.findMany({
        include: { pilot: true, student: true },
      })),

  summaryLessonFlights: publicProcedure.input(
    z.object({
      params: z.object({
        studentRegistrationNumber: z.string()
      })
    })).query(async ({ input }) => {
      const flights = await prisma.flight.findMany({
        include: { pilot: true, student: true },
        where: {
          student: {
            registerNumber: input.params.studentRegistrationNumber
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
        allowLicense: totalDurationHr >= 150 && averageScore >= scoreToValue(ScoreSchema.enum.B),
      }
    }),

  createFlight: publicProcedure
    .input(FlightSchema)
    .mutation(async ({ input }) => {

      const pilot = await prisma.partner.findUnique({ where: { license: input.pilotLicense } })

      if (pilot == null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `pilot ${input.pilotLicense} not found`
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
