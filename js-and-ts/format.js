const surroundWithStars = (value) => {
  const valueLength = value.toString().length;
  const topBottomBorder = '*'.repeat(valueLength + 2);

  return topBottomBorder
         + "\n"
         + '*' + value.toString() + '*'
         + "\n"
         + topBottomBorder;
}

module.exports.Formatter = { surroundWithStars };

