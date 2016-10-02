<?php
	$id		= $entity->getID();
	$type 	= $entity->getType();
	$url 	= $entity->getUrlWebsite();
	$title 	= $entity->getTitle();
	$posts 	= $entity->getPosts();
?>

<section 
	class="feed is-visible" 
	data-id="<?php echo $id; ?>" 
	data-type="<?php echo $type; ?>" 
	data-feed="<?php echo $title; ?>"
>
	<div class="row">
	
		<h2 class="feed-title">
			<a href="<?php echo $url; ?>" target="_blank"><?php echo $title; ?></a>
		</h2>

		<?php if (is_array($posts)): ?>
			<ul class="feed-posts list list--posts">
				<?php foreach ($posts as $postID => $post): ?>
					<?php 
						$attributes = array(
							'id' => $postID
						);
						echo App::render('post', $post, $attributes);
					?>
				<?php endforeach; ?>
			</ul>
			<footer class="feed-footer">
				<button class="btn btn--more">More</button>
			</footer>

		<?php else: ?>
			<p>An error occured.</p>
			<p>Check manually <a href="<?php echo $entity->getUrlDiffusion(); ?>" target="_blank">the xml file</a>.</p>
		<?php endif; ?>

	</div>
</section>