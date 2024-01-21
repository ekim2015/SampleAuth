// idea: extract keywords using NLP of job description dataset
// with trained model, extract keywords from new job description and compare with resume
const parseStats = (posting, resume) => {
    // temp array of common words to ignore
    let commonWords = ['a', 'the', 'they', 'he', 'him', 'she', 'her', 'them', 'an', 'is', 'for', 'of', 'with', 'will', 'be', 'to', 'should', 'have']
    let wordsFound = 0

    let postArr = posting.split(" ")
    let resumeArr = posting.split(" ")

    postArr = postArr.filter((word) => commonWords.includes(word) == false)
    resumeArr = resumeArr.filter((word) => commonWords.includes(word) == false)

    postArr.forEach((word) => {console.log(word)})

    resumeArr.forEach((word) => { if (postArr.includes(word)) { wordsFound++ }})

    return wordsFound / resumeArr.length
}

module.exports = parseStats