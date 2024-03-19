import roomdetails from '../JsonData/RoomNO.json'

const codeValidation = (value) => {
    if (/\d/.test(value)) {
        return 'No numbers allowed';
    }
    if (/\s/.test(value)) {
        return 'No spaces allowed';
    }
    if (/^[^\w\s\d]+$/.test(value)) {
        return 'Any Symbol not allowed';
    }
    return true;
}

const getDeadlineReturnAccessories = (accessories) => {
    return accessories?.filter(accessorie => accessorie.deadline)
}
const checkReturnedStatus = (order) => {
    console.log(order);
    const checkStatus = order.accessories?.filter(accessorie => !accessorie.returned.status && accessorie.isItReturnable == 'Yes')
    if (checkStatus.length > 0) {
        return true
    } else {
        return false
    }

}
//Cofirm Distribute Page
const validateAccessoryCode = (value, quantity) => {
    if (value.length > quantity) {
        return `Maximum Quantity ${quantity}`
    }
    return true
}
const handleAccessoriesCodeOption = (codes) => {
    return codes.map(code => code && { value: code, label: code })
}
//******Admin Utils**********//

//Admin component:Distribute form
const handleRoomTypeOptions = () => {
    return roomdetails?.roomData.map(type => type && { value: type.roomType, label: type.roomType })
}
const handleRoomNoOptionsByRoomType = (value) => {
    return roomdetails?.roomData.find(type => type.roomType == value)?.rooms?.map(room => room && { value: room.roomNo, label: room.roomNo })
}
export { codeValidation, handleAccessoriesCodeOption, validateAccessoryCode, getDeadlineReturnAccessories, checkReturnedStatus, handleRoomTypeOptions, handleRoomNoOptionsByRoomType }