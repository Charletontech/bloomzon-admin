
async function withoutItem(obj, item) {  
    const { [item]: unused, ...rest } = obj

  return rest
}

module.exports = {withoutItem}