const Home = require("../models/Home");

async function create(data) {
  const newAd = new Home(data);
  return await newAd.save();
}

async function search(searchInput) {
  const data = await Home.find({
    region: searchInput.region,
    adType: searchInput.adType,
    estateType: searchInput.estateType,
    price: { $lte: searchInput.price },
    area: { $gte: searchInput.area },
    rooms: { $gte: searchInput.rooms }.limit(searchInput.limit * 10),
  });
  return data;
}

async function getLatest(limit) {
  return await Home.find({ isNewProject: { $in: false } })
    .sort({ date: -1 })
    .limit(limit)
    .populate("owner");
}

async function getAll(limit) {
  const data = await Home.find().sort({ date: -1 }).limit(limit);
  // .populate("owner");
  const count = await Home.count();
  data.total_pages = Math.ceil(count / 10);
  data.total_results = count;
  return data;
}

async function getById(id) {
  return await Home.findById(id).lean();
}

async function deleteById(id) {
  await Home.findByIdAndDelete(id);
}

async function updateById(id, userId, data) {
  let current = await Home.findById(id);

  if (!current) throw new Error("Could not find ID in database");
  if (current.owner != userId) throw new Error("Not allowed!");

  current = Object.assign(current, data);
  return current.save();
}

async function likeAd(id, userId) {
  const currentAd = await Home.findById(id);
  currentAd.liked.push(userId);
  await currentAd.save();
}

async function getLastTree() {
  return await Home.find({ isNewProject: { $in: true } })
    .populate("owner")
    .sort({ date: -1 })
    .limit(3)
    .lean();
}

//TODO implement it
async function sortByLikes() {
  return await Home.find().sort({ field: "desc", liked: -1 }).lean();
}

//TODO implement it
async function sortByDate() {
  return await Home.find({}).sort({ field: "desc", created: -1 }).lean();
}

module.exports = {
  create,
  getLatest,
  getById,
  deleteById,
  updateById,
  likeAd,
  getLastTree,
  sortByLikes,
  sortByDate,
  search,
  getAll,
};
