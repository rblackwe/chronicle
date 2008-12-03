<h3>Archive</h3>
 <ul>
  <!-- tmpl_loop name='datecloud' -->
   <li><!-- tmpl_var name='year' -->
   <ul>
    <!-- tmpl_loop name='months' -->
     <li><a href="<!-- tmpl_var name='top' -->archive/<!-- tmpl_var name='year' -->/<!-- tmpl_var name='month' -->/"><!-- tmpl_var name='month_name' --> (<!-- tmpl_var name='count' -->)</a></li>
    <!-- /tmpl_loop -->
   </ul></li>
  <!-- /tmpl_loop -->
 </ul>
