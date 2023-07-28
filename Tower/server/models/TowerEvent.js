import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerEventSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minLength: 3, maxLength: 1000 },
    description: { type: String, required: true, minLength: 3, maxLength: 1000 },
    coverImg: { type: String, required: true, minLength: 3, maxLength: 1000 },
    location: { type: String, required: true, minLength: 3, maxLength: 1000 },
    capacity: { type: Number, required: true, min: 1, max: 999 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
// TODO Ticket count virtual will be required
TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  count: true
})