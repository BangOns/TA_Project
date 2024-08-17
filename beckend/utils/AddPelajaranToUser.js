const { List_pelajaran, User } = require("../schema/SchemaDB");

async function AddPelajaranToUser(id) {
  try {
    const responsePelajaran = await List_pelajaran.find();
    responsePelajaran.forEach(async (pelajaran) => {
      await User.updateOne(
        { _id: id },
        {
          $push: {
            data_pelajaran: {
              _id: pelajaran._id,
              name: pelajaran.name,
              nilai: 0,
              kehadiran: 0,
            },
          },
        }
      );
    });
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return error;
  }
}

module.exports = AddPelajaranToUser;
