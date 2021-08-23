import { partnerUniqueCodeHandler } from '../../data-handlers'

export const getTicketNumber = (ticket) => {
  const created = ticket && ticket.created ? Number(ticket.created) : Date.now()

  const [year, month, day] = new Date(created).toISOString().slice(0, 10).split('-')
  ticket.num = ticket.num || 1
  return `${partnerUniqueCodeHandler()}${month}${day}${year.slice(-2)}${ticket.num.toString().padStart(3, '0')}`
}
