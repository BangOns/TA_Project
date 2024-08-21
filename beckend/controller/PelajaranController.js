const { validationResult } = require("express-validator");
const { List_pelajaran, User } = require("../schema/SchemaDB");
const Response = require("../schema/SchemaResponse");

async function GetPelajaran(req, res) {
  try {
    const pelajaran = await List_pelajaran.find();
    Response(200, pelajaran, "success get all pelajaran", res);
  } catch (error) {
    Response(400, error, "failed get all pelajaran", res);
  }
}

async function AddPelajaran(req, res) {
  try {
    const resultValidate = validationResult(req);
    if (!resultValidate.isEmpty()) {
      return Response(400, resultValidate, "failed add pelajaran", res);
    } else {
    }
    const createNewPelajaran = await List_pelajaran.create(req.body);
    await User.updateMany(
      { role: "user" },
      {
        $push: {
          data_pelajaran: {
            _id: createNewPelajaran._id,
            name: createNewPelajaran.name,
            nilai: 0,
            kehadiran: 0,
            Total_nilai: 0,
          },
        },
      }
    );
    const response = await List_pelajaran.find();
    const MessageResponse = "success add pelajaran";
    Response(200, response, MessageResponse, res);
  } catch (error) {
    Response(400, error, "failed add pelajaran", res);
  }
}
async function DeletePelajaran(req, res) {
  try {
    const name = req.params.name;
    await User.updateMany(
      {},
      {
        $pull: {
          data_pelajaran: { name },
        },
      }
    );
    const getUpdateUser = await User.find();
    await List_pelajaran.deleteOne({ name: name });
    Response(200, getUpdateUser, "success delete pelajaran by name", res);
  } catch (error) {
    Response(400, error, "failed delete user by id", res);
  }
}

async function UpdateUserDataPelajaran(req, res) {
  const NilaiAvarage = 100;
  const MaxKehadiran = 16;
  try {
    const { npm, idpelajaran } = req.params;
    const { nilai, kehadiran } = req.body;
    const persentaseNilai_Kehadiran = (kehadiran / MaxKehadiran) * NilaiAvarage;
    const Hasil_RataRata = (nilai + persentaseNilai_Kehadiran) / 2;
    const formatted_Hasil_RataRata = Number.isInteger(Hasil_RataRata)
      ? Hasil_RataRata.toString()
      : Hasil_RataRata.toFixed(2);
    await User.updateOne(
      {
        npm: npm,
        "data_pelajaran._id": idpelajaran,
      },
      {
        $set: {
          "data_pelajaran.$.nilai": nilai,
          "data_pelajaran.$.kehadiran": kehadiran,
          "data_pelajaran.$.Total_nilai": formatted_Hasil_RataRata,
        },
      },
      {
        new: true,
      }
    );
    const response = await User.findOne({
      npm: npm,
      "data_pelajaran._id": idpelajaran,
    }).exec();
    Response(200, response, "Success update pelajaran user by name", res);
  } catch (error) {
    Response(400, error, "failed update pelajaran user by name", res);
  }
}

module.exports = {
  GetPelajaran,
  AddPelajaran,
  DeletePelajaran,
  UpdateUserDataPelajaran,
};
