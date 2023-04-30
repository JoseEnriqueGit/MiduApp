import Notes from "../models/noteModel.js";

export const runServer = (req, res) => {
	return res.json({
		status: "success",
		message: "Server running",
	});
};

export const getAllNotes = async (req, res) => {
	try {
		const result = await Notes.find();
		if (!result.length) {
			return res.status(404).json({
				message: "No se han encontrado registros",
			});
		}
		res.status(200).json({
			message: "Registros obtenidos exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener los registros",
			error,
		});
	}
};

export const getNote = async (req, res) => {
	try {
		const result = await Notes.findOne({ _id: req.params.id });
		if (!result) {
			return res.status(404).json({
				message: "El registro solicitado no ha sido encontrado",
				result,
			});
		}
		res.status(200).json({
			message: "Registro obtenido exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener el registro",
			error,
		});
	}
};

export const newNote = async (req, res) => {
	try {
		const result = await Notes.create(req.body);
		res.status(201).json({
			message: "Registro creado exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al crear el registro",
			error,
		});
	}
};

export const modicNote = async (req, res) => {
	try {
		const result = await Notes.updateOne(
			{ _id: req.params.id },
			req.body,
			{ upsert: true }
		);
		res.status(200).json({
			message: "Registro actualizado exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al actualizar el registro",
			error,
		});
	}
};

export const deleteNote = async (req, res) => {
	try {
		const result = await Notes.deleteOne({ _id: req.params.id });
		res.status(200).json({
			message: "Registro eliminado exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al eliminar el registro",
			error,
		});
	}
};
