<?php if (!empty($attributes)) { ?>
	<?php
	$img = wp_get_attachment_image_src($attributes['bgmediaID'], 'full');
	$bg = $img ? 'background-image: url(' . $img[0] . ');' : '';

	$cta_style = '';
	if ($attributes['ctastyle'] == 'outline') $cta_style = 'btn-outline';
	if ($attributes['ctastyle'] == 'dark') $cta_style = 'btn-dark';
	?>

	<div <?= get_block_wrapper_attributes(['class' => "container wp-block-rgdevme-banner"]) ?>>
		<div style="<?= $bg ?>" data-layout=<?= $attributes['layout'] ?> data-appearance=<?= $attributes['appearance'] ?>>

			<?php if (array_key_exists('title', $attributes)) { ?>
				<h3 class="rgdevme-banner-title"><?= $attributes['title'] ?></h3>
			<?php } ?>

			<?php if (array_key_exists('text', $attributes)) { ?>
				<p class="rgdevme-banner-text"><?= $attributes['text'] ?></p>
			<?php } ?>

			<?php if (
				array_key_exists('ctatext', $attributes) &&
				array_key_exists('ctalink', $attributes)
			) { ?>
				<div class="rgdevme-banner-cta wp-block-button <?= $cta_style ?>">
					<a class="wp-block-button__link" href="<?= $attributes['ctalink'] ?>" target="<?= $attributes['ctatarget'] ? '_blank' : '_self' ?>">
						<?= $attributes['ctatext'] ?>
					</a>
				</div>
			<?php } ?>

		</div>
	</div>

<?php } ?>