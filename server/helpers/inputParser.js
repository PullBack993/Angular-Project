function searchInputParser(req) {
    const data = {
        region: req.query.region,
        adType: req.query.adType,
        estateType: req.query.estateType,
        price: parseStringToNumber(req.query.price),
        area: parseStringToNumber(req.query.area),
        rooms: parseStringToNumber(req.query.rooms),
        limit: parseStringToNumber(req.query.limit) || 1
    };

    return data;
};

function homeInputParser(req){
    const data = {
      adType: req.body.adType,
      estateType: req.body.estateType,
      price: parseStringToNumber(req.body.price),
      rooms: parseStringToNumber(req.body.rooms),
      location: req.body.location,
      imageUrls: req.body.imageUrls,
      region: req.body.region,
      area: parseStringToNumber(req.body.area),
      floor: parseStringToNumber(req.body.floor),
      constructionType: req.body.constructionType,
      telNumber: parseStringToNumber(req.body.telNumber),
      moreInfo: req.body.moreInfo,
      isNewProject: req.body.isNewProject,
    };

    return data;
};

function parseStringToNumber(param) {
    if (param && param !== '') {
        const data = Number(param.split(' ').join(''));
        return data;
    }
    throw new Error('Fields couldn\'t be empty')
};

module.exports = {
    searchInputParser,
    homeInputParser,
};