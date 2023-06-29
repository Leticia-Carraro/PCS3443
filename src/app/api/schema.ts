import { z } from 'zod';

export const RoleSchema = z.enum(['student', 'instructor', 'pilot', 'employee', 'admin'] as const)

export const UserSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
  role: RoleSchema,
});

export const LoginRequestPayload =  UserSchema.pick({username: true, password: true})
export type LoginRequestPayload = z.infer<typeof LoginRequestPayload>

const StateValues = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'] as const
export const StateSchema = z.enum(StateValues)
export type StateSchema = z.infer<typeof StateSchema>

export const AddressSchema = z.object({
  state: StateSchema,
  city: z.string().trim().min(3),
  street: z.string().trim().min(3),
  number: z.coerce.number().gt(0),
  complement: z.string().optional(),
})

export const PersonSchema = UserSchema.extend({
  name: z.string().min(3),
  document: z.string().length(11),
  birthDate: z.coerce.date(),
  address: AddressSchema,
})


export const EmployeeSchema = PersonSchema.extend({
  registerNumber: z.string().min(5),
})

export type EmployeeCreateRequestPayload = z.infer<typeof EmployeeSchema>
export const EmployeeCreateRequestPayload = EmployeeSchema.omit({role: true})

export const StudentSchema = PersonSchema.extend({
  role: z.literal("student"),
  registerNumber: z.string(),
  email: z.string().email(),
})
export const StudentCreateRequestPayload = StudentSchema.omit({role: true})
export type StudentCreateRequestPayload = z.infer<typeof StudentCreateRequestPayload>

export const PilotSchema = StudentSchema.extend({
  role: z.literal("student"),
  license: z.string(),
})
export const PilotCreateRequestPayload = PilotSchema.omit({role: true})
export type PilotCreateRequestPayload = z.infer<typeof PilotCreateRequestPayload>

export const InstructorSchema = PilotSchema.extend({
  role: z.literal("instructor"),
  course: z.string(),
  graduationDate: z.coerce.date(),
  institution: z.string(),
})
export const InstructorCreateRequestPayload = InstructorSchema.omit({role: true})
export type InstructorCreateRequestPayload = z.infer<typeof InstructorCreateRequestPayload>

export const PartnerSchema = z.union([InstructorSchema, PilotSchema, StudentSchema])
export const PartnerCreateRequestPayload = z.union([InstructorSchema, PilotSchema, StudentSchema])
export const PartnerSchemaPartial = z.union([InstructorSchema.deepPartial(), PilotSchema.deepPartial(), StudentSchema.deepPartial()])

export const ScoreValues = ['F', 'D', 'C', 'B', 'A'] as const
export const ScoreSchema = z.enum(ScoreValues)
export type ScoreSchema = z.infer<typeof ScoreSchema>

export const FlightSoloSchema = z.object({
  type: z.literal("solo"),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  pilotLicense: z.string(),
})

export type FlightSoloCreateRequestPayload = z.infer<typeof FlightSoloSchema>
export const FlightSoloCreateRequestPayload = FlightSoloSchema


export const FlightLessonSchema = FlightSoloSchema.extend({
  type: z.literal("lesson"),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  studentRegistrationNumber: z.string(),
  pilotLicense: z.string(),
  score: ScoreSchema,
})

export type FlightLessonCreateRequestPayload = z.infer<typeof FlightLessonSchema>
export const FlightLessonCreateRequestPayload = FlightLessonSchema

export const FlightSchema = z.union([FlightLessonSchema, FlightSoloSchema])
