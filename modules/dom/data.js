import attr from 'attr'
export default function data (name, value) {
  var attrName = 'data-' + name.replace(/([A-Z])/g, '-$1').toLowerCase()

  var data = (1 in arguments) ?
    attr(attrName, value) :
    attr(attrName)

  return data;
}