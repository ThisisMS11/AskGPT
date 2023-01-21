// *********chat AI CODE
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
exports.chai = async (req, res) => {
  const quistion = req.body.quistion;
  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: quistion,
      max_tokens: 4000,
      temperature: 0,
    });
    if (result) {
      res.send(result.data.choices[0].text);
    //   console.log(result.data);
    }
  } catch (err) {
    console.log(err);
  }
  //  .then((response) => {
  //   res.send(response.data)
  //    console.log(response.data)

  //  }).catch();
  // res.send(quistion);
};
