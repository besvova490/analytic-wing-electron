function formatThousands(num) {
  if (num < 1000) {
    return num.toString();
  } else if (num % 1000 === 0) {
    return `${(num / 1000).toString()}K`;
  }
  
  return `${(num / 1000).toFixed(1) }K`;
  
}

export default formatThousands;
