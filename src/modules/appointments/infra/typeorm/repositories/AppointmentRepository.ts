import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'

interface ICreateAppointment{
  date: Date;
}

export default class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate({ date }:ICreateAppointment): Promise<Appoitnment|null> {
    const findAppointment = await this.ormRepository.findOne(
      { where: { date } },
    );

    return findAppointment || null;
  }
}
