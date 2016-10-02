<?php 
	$picture = $entity->getPicture();
	$link 	 = $entity->getLink();
	$title	 = $entity->getTitle();
	$date 	 = $entity->getDate();

	$classes = array('list-item');
	$classes[] = ($id <= 2) ? 'l-third' : 'l-quarter';
	$pictureUrl = ($picture) ? ' style="background-image: url('.$picture.');"' : '';
?>
<li class="<?php echo trim(implode(' ', $classes)); ?>">
	<article class="item-wrapper">
	
		<a href="<?php echo $link; ?>" target="_blank">

			<div class="item-image">
				<div<?php echo $pictureUrl; ?>></div>
			</div>

			<header class="item-header">
				<h3 class="item-title"><?php echo $title; ?></h3>
				<span class="item-date"><?php echo $date; ?></span>
			</header>
		</a>
	</article>
</li>