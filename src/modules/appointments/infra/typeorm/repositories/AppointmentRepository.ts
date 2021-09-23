import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/infra/repositories/IAppointmentRepository'

interface ICreateAppointment{
  date: Date;
}

@EntityRepository(Appointment)
export default class AppointmentRepository extends Repository<Appointment>
  implements IAppointmentRepository {
  public async findByDate({ date }:ICreateAppointment): Promise<Appoitnment|null> {
    const findAppointment = await this.findOne(
      { where: { date } },
    );

    return findAppointment || null;
  }
}
