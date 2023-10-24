function replaceXsVueEmojiTags(inputString) {
  const regex = /<xs-vue-emoji url="([^"]+)" emojiname="([^"]+)" ><\/xs-vue-emoji>/g;
  const replacedStr = inputString.replace(regex, '[emjoi:$2]');
  return replacedStr;
}

const str = '<xs-vue-emoji url="https://xxx.aa.com/b.jpg" emojiname="窃笑" ></xs-vue-emoji>234<xs-vue-emoji url="https://xxx.aa.com/b.jpg" emojiname="开心" ></xs-vue-emoji>qwerie';

const result = replaceXsVueEmojiTags(str);

console.log(result);
