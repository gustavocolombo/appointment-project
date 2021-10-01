import startOfHour from 'date-fns/startOfHour';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface ICreateAppointment{
  date: Date;
  provider: string;
}

export default class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentRepository) {}

  public async execute({ date, provider }: ICreateAppointment): Promise<Appointment> {
    const startedHour = startOfHour(date);
    const findAppointment = await this.appointmentsRepository.findByDate({ date: startedHour });

    if (findAppointment) {
      throw new Error('Cannot create appointment, another appointment in same date was found');
    }

    const appointment = this.appointmentsRepository.create({ date: startedHour, provider });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}
