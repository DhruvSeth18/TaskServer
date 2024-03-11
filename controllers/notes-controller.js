import Notes from "../models/notesModel.js";
import NoteUser from "../models/userModel.js";

export const CreateNote = async (request, response) => {
    try {
        const currDate = new Date();
        console.log(currDate);
        const username = request.params.username;
        const newNote = {
            username: username,
            title: request.body.title,
            description: request.body.description,
            validTill: request.body.validTill,
            color: "#1d4ed8",
            currdate: currDate,
            completed: request.body.completed
        }
        console.log(newNote);
        const createNotes = new Notes(newNote);
        await createNotes.save();

        return response.status(201).json({
            status: 'success',
            note: createNotes
        });
    }
    catch (err) {
        console.log("There is been an error while creating a note", err);
        return response.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

export const GetUserNotes = async (request, response) => {
    try {
        const CheckUser = await NoteUser.find({username:request.params.username});
        if(CheckUser.length===0){
            return response.status(404).json({
                status:'fail',
                message:'Invalid User'
            })
        }
        const UserNotes = await Notes.find({ username: request.params.username });
        await Promise.all(UserNotes.map(async (item) => {
            const startDate = new Date(item.currdate);
            const currentDate = new Date();
            const oneDay = 24 * 60 * 60 * 1000;
            const diffDays = Math.round(Math.abs((currentDate - startDate) / oneDay));

            if (diffDays > item.validTill) {
                await Notes.updateMany({ _id: item._id }, { $set: { color: 'crimson' } }, { new: true });
            }
        }));

        const UpdatedUserNotes = await Notes.find({ username: request.params.username });

        if (UpdatedUserNotes.length > 0) {
            return response.status(200).json({
                status: 'success',
                userNotes: UpdatedUserNotes
            })
        } else {
            return response.status(204).json({
                status: 'fail',
                message: "No Data Found"
            })
        }
    }
    catch (err) {
        console.log("Error while getting the created Notes 🚨 ", err);
        return response.status(400).json({
            status: 'fail',
            error: err
        })
    }
}

export const deleteNotes = async (request, response) => {
    try {
        const id = request.params.id;
        await Notes.deleteMany({ _id: id });
        return response.status(200).json({
            status: 'success',
        });
    } catch (err) {
        console.log("There is been an error when deleting the Notes");
        return response.status(400).json({
            status: 'fail',
            err: err
        });
    }
}

export const updateNotes = async (request, response) => {
    try {
        const id = request.params.id;
        const updateNotes = await Notes.findOneAndUpdate({ _id: id }, { $set: request.body }, { new: true });
        console.log(updateNotes);
        if (updateNotes) {
            return response.status(200).json({
                status: 'success',
                Notes: updateNotes
            })
        }
        else {
            return response.status(200).json({
                status: 'success',
                messege: 'No Notes found'
            })
        }
    } catch (err) {
        console.log("Error while finding and updateing the Notes ", err);
        return response.status(400).json({
            status: 'fail',
            message: 'Error while finding and updatinng the Document'
        })
    }
}