import coachModel from "./coachModel";

const {
    formField: { totalVolume, trainingType, comment },
} = coachModel;

export default {
    [totalVolume.name]: "",
    [trainingType.name]: "",
    [comment.name]: "",
};
