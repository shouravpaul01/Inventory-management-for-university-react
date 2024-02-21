
const getReturnAccessories = (accessories) => {
    return accessories?.filter(accessorie=>accessorie.returnStatus=='Yes')
};

export default getReturnAccessories;