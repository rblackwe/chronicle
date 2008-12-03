<!-- tmpl_if name='comments' -->
 <h3 id="comments">Comments On This Entry</h3>

 <!-- tmpl_loop name='comments' -->
 <div class="bubble">
  <blockquote>
   <!-- tmpl_var name='body' -->
  </blockquote>
  <cite><strong><!-- tmpl_var name='name' --></strong> <!-- tmpl_var name='date' --></cite>
 </div>
 <!-- /tmpl_loop -->
<!-- /tmpl_if -->
