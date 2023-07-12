function getDomain(url) {
  try {
    const urlObj = new URL(url);
    
    return urlObj.hostname;
  } catch (e) {
    
    return null;
  }
}

export default getDomain;
