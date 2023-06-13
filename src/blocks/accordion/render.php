<?php if (!empty($attributes)) { ?>
	<div <?= get_block_wrapper_attributes(['class' => "wp-block-rgdevme-accordion"]) ?>>

		<?php if (array_key_exists('title', $attributes)) { ?>
			<div class='rgdevme-accordion-title'>
				<span>
					<?= $attributes['title'] ?>
				</span>
			</div>
		<?php } ?>

		<?php if ($content != '') { ?>
			<div class='rgdevme-accordion-content' data-open='false' style="height: 0;">
				<?= $content ?>
			</div>
		<?php } ?>

		<div class='rgdevme-accordion-arrow' data-open='false'>
			<img src="<?= GD_BASE_URL . 'src/assets/arrow-down.svg' ?>" />
		</div>
	</div>
<?php } ?>