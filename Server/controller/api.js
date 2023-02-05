// *********chat AI CODE
const OPENAI_API_KEY = "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";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
exports.chai = async (req, res) => {

  const question = req.body.question;

  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 4001,
      temperature: 0,
    });
    if (result) {
      // console.log(result.data.choices[0].text);

      
      res.send(result.data.choices[0].text);
      //   console.log(result.data);
    }
  } catch (err) {
    console.log('err = ', err);
  }
};
