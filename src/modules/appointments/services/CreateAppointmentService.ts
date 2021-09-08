import startOfHour from 'date-fns/startOfHour';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface ICreateAppointment{
  date: Date;
  provider: string;
}

export default class CreateAppointmentService {
  public async execute({ date, provider }: ICreateAppointment): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const startedHour = startOfHour(date);
    const findAppointment = await appointmentRepository.findByDate({ date: startedHour });

    if (findAppointment) {
      throw new Error('Cannot create appointment, another appointment in same date was found');
    }

    const appointment = appointmentRepository.create({ date: startedHour, provider });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}
