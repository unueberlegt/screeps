const config = require("config")
const processUtils = require("util.process")

module.exports = {
    constructRemoteRoomUnderFlag: function (flag) {
        const visual = new RoomVisual(flag.room.name)
        const targetRoom = flag.room
        const ownerRoomName = flag.name
        if (processUtils.checkRoomExistsAndItsMine(ownerRoomName)) {
            visual.text(`Room ${ownerRoomName} doesn't exist or it's not mine.`, flag.pos)
            return
        }
        const label = `construction_manager_of_room_${targetRoom.name}`
        if (Kernel.getProcessByLabel(label)) {
            visual.text(`Process to construct room ${targetRoom.name} already exists.`, flag.pos)
            return
        }
        const process = Kernel.scheduler.launchProcess(
            Kernel.availableProcessClasses.ConstructionManager,
            label
        )
        visual.text(`Launched process ${process.label}.`, flag.pos)
        process.ownerRoomName = ownerRoomName
        process.targetRoomName = flag.room.name
    }
}