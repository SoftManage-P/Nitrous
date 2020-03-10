<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
        <title>Lexa - Responsive Bootstrap 4 Admin Dashboard</title>
        @include('admin_panel.layouts.head')
  </head>
<body>
      @yield('content')
    @include('admin_panel.layouts.footer')    
    @include('admin_panel.layouts.footer-script')    
    </body>
</html>