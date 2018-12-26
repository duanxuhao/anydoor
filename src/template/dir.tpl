<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="ie=edge"/>
	<title>{{title}}</title>
	<style type="text/css">
		body{
			margin:30px;
		}
		a{
			display: block;
			font-size: 30px;
			text-decoration: none;
		}
	</style>
</head>
<body>
	{{#each files}}
		<a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>
	{{/each}}
</body>
</html>
