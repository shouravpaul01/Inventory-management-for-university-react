
const getReturnAccessories = (accessories) => {
    return accessories?.filter(accessorie=>accessorie.isItReturnable=='Yes')
};

export default getReturnAccessories;