module.exports= function(status=500, message="server error"){
  return {
    status,
    message
  }
}