<?php if (!empty($attributes)) { ?>
	<?= jslog(['att' => $attributes]) ?>
	<div id="wp-rgdevme-slider" <?= get_block_wrapper_attributes(['class' => "container wp-block-rgdevme-slider"]) ?>>
		<?= $content ?>
	</div>

	<script>
		jQuery('#wp-rgdevme-slider').slick({
			infinite: true,
			slidesToShow: <?= $attributes['slidesToShow'] ?>,
			slidesToScroll: <?= $attributes['slidesToScroll'] ?>
		});
	</script>
<?php } ?>