const user = supabase.auth.user();
if (user) {
  	document.getElementById('user-info').innerText = `Logged in as: ${user.email}`;
}
else {
	console.log('not logged in');
  	document.getElementById('user-info').innerText = 'Not logged in';
}