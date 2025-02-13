export const downloadFeedbacksExcel = async(req, res) => {
    res.download(`../../store/feedbacksData.xlsx`)
}

export const downloadRegistersExcel = async(req, res) => {
    res.download(`../../store/registersData.xlsx`)
}