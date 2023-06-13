<?php if (!empty($attributes)) { ?>
	<?php

	if (!isset($attributes)) {
		$attributes = [];
	}

	$img_d = wp_get_attachment_image_src(
		$attributes['bgmediaID'],
		'full'
	);
	$img_m = wp_get_attachment_image_src(
		$attributes['bgmediamobileID'],
		'full'
	);

	$show_hero =
		array_key_exists('title', $attributes) ||
		array_key_exists('text', $attributes) ||
		array_key_exists('ctatext', $attributes) ||
		boolval($img_d);

	$bg_d = $img_d ? 'url(' . $img_d[0] . ')' : 'unset';
	$bg_m = $img_m ? 'url(' . $img_m[0] . ')' : $bg_d;

	$bg_vars = '--bgdesktop: ' . $bg_d . ';';
	$bg_vars .= '--bgmobile: ' . $bg_m . ';';

	$ar_vars = '--ardesktop: ' . ($img_d ? $img_d[1] / $img_d[2] : 1) . ';';

	$ar_vars .= '--armobile: ' . ($img_m ? $img_m[1] / $img_m[2] : 1) . ';';

	jslog(['att' => $attributes]);

	?>

	<?php if ($attributes['breadcrumbs']) { ?>
		<div class="container">
			<?= breadcrumbs() ?>
		</div>
	<?php } ?>

	<?php if ($show_hero) { ?>
		<div style="<?= $ar_vars ?>" <?= get_block_wrapper_attributes(['class' => "container wp-block-rgdevme-hero"]) ?> data-width=<?= $attributes['width'] ?>>

			<div style="<?= $bg_vars ?>" data-width=<?= $attributes['width'] ?>>

				<div class="container" data-layout=<?= $attributes['layout'] ?> data-appearance=<?= $attributes['appearance'] ?>>

					<?php if (array_key_exists('title', $attributes)) { ?>
						<h3 class="rgdevme-hero-title"><?= $attributes['title'] ?></h3>
					<?php } ?>

					<?php if (array_key_exists('text', $attributes)) { ?>
						<p class="rgdevme-hero-text"><?= $attributes['text'] ?></p>
					<?php } ?>

					<?php if (
						array_key_exists('ctatext', $attributes) &&
						array_key_exists('ctalink', $attributes)
					) { ?>
						<div class="rgdevme-hero-cta wp-block-button">
							<a class="wp-block-button__link" href="<?= $attributes['ctalink'] ?>" target="<?= $attributes['ctatarget'] ? '_blank' : '_self' ?>">
								<?= $attributes['ctatext'] ?>
							</a>
						</div>
					<?php } ?>

				</div>

			</div>
		</div>
	<?php } ?>

<?php } ?>