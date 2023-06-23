import { z } from 'zod';

export const RoleSchema = z.enum(['student', 'instructor', 'pilot', 'employee', 'admin'] as const)

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: RoleSchema,
});

export const LoginRequestPayload =  UserSchema.pick({username: true, password: true})
export type LoginRequestPayload = z.infer<typeof LoginRequestPayload>

export const AddressSchema = z.object({
  state: z.string().max(2),
  city: z.string(),
  street: z.string(),
  number: z.number(),
  complement: z.string().optional(),
})

export const PersonSchema = UserSchema.extend({
  name: z.string(),
  document: z.string(),
  birthDate: z.coerce.date(),
  address: AddressSchema,
})


export const EmployeeSchema = PersonSchema.extend({
  registerNumber: z.string(),
})

export const StudentSchema = PersonSchema.extend({
  type: z.literal("student"),
  registerNumber: z.string(),
  email: z.string().email(),
})

export const PilotSchema = StudentSchema.extend({
  type: z.literal("pilot"),
  license: z.string(),
})

export const InstructorSchema = PilotSchema.extend({
  type: z.literal("instructor"),
  course: z.string(),
  graduationDate: z.coerce.date(),
  institution: z.string(),
})

export const PartnerSchema = z.union([InstructorSchema, PilotSchema, StudentSchema])
export const PartnerSchemaPartial = z.union([InstructorSchema.deepPartial(), PilotSchema.deepPartial(), StudentSchema.deepPartial()])

export const ScoreValues = ['F', 'D', 'C', 'B', 'A'] as const
export const ScoreSchema = z.enum(ScoreValues)
export type ScoreSchema = z.infer<typeof ScoreSchema>

export const FlightSoloSchema = z.object({
  type: z.literal("solo"),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  pilotLicence: z.string(),
})

export const FlightLessonSchema = FlightSoloSchema.extend({
  type: z.literal("lesson"),
  studentRegistrationNumber: z.string(),
  score: ScoreSchema,
})

export const FlightSchema = z.union([FlightLessonSchema, FlightSoloSchema])
