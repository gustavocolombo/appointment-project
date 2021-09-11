import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/entities/Appointment';

interface ICreateAppointment{
  date: Date;
}

@EntityRepository(Appointment)
export default class AppointmentRepository extends Repository<Appointment> {
  public async findByDate({ date }:ICreateAppointment): Promise<Appoitnment|null> {
    const findAppointment = await this.findOne(
      { where: { date } },
    );

    return findAppointment || null;
  }
}
