import { Router } from 'express';
import { parseISO } from 'date-fns';
import { Joi, celebrate } from 'celebrate';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.post('/', celebrate({
  body: Joi.object().keys({
    date: Joi.date().required(),
    provider: Joi.date().required(),
  }),
}), async (request, response) => {
  try {
    const { date, provider } = request.body;

    const parsedDate = parseISO(date);

    const appointmentService = container.resolve(CreateAppointmentService);

    const appointment = await appointmentService.execute({ date: parsedDate, provider });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
