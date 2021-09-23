import Appointment from '../typeorm/entities/Appointment';

export default interface IAppointmentRepository{
  findByDate(date: Date): Promise<Appointment | null>
}
