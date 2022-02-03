class ScheduleController {
  async getFreeLotsForSchedule () {
    self.postMessage(await self.controller.getFreeLotsForSchedule())
  }
}

export const scheduleController = new ScheduleController()
