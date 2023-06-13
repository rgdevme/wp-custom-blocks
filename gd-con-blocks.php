<?php

/**
 * Plugin Name:       rgdevme Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9.2
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rgdevme
 *
 * @package           rgdevme
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

global $root;
$root = plugin_dir_path(__FILE__);
$gdbaseurl = plugin_dir_url(__FILE__);

define('GD_BASE_URL', $gdbaseurl);

include_once($root . 'src/utils/index.php');

function create_block_rgdevme_blocks_block_init()
{
	global $root, $gdbaseurl;
	$directory = $root . 'build/blocks/';
	$blocks = [
		'hero',
		'banner',
		'accordion',
		'grid',
		'divider',
		'slider'
	];

	wp_enqueue_style('rgdevme-styles', $gdbaseurl . 'build/style.css');

	foreach ($blocks as $block) {
		$route = $directory . $block . '/';
		$file = $route . 'render.php';
		$js_asset = 'src/blocks/' . $block . '/assets.js';

		if (file_exists($root . $js_asset)) {
			$script_name = 'rgdevme-' . $block;
			wp_register_script(
				$script_name,
				$gdbaseurl . $js_asset,
				[],
				null,
				true
			);
			wp_enqueue_script($script_name);
		}

		register_block_type($route, [
			'render_callback' => function ($attributes, $content) use ($file) {
				$exists = file_exists($file);
				$is_json = wp_is_json_request();
				$is_admin = is_admin();
				$current_screen = get_current_screen();
				$is_editor = method_exists($current_screen, 'is_block_editor') ? $current_screen->is_block_editor() : false;

				if (
					$exists &&
					!$is_json &&
					!$is_editor &&
					!$is_admin
				) {
					ob_start();
					echo jslog([
						"attributes" => $attributes,
						"content" => $content
					]);
					include $file;
					$html = ob_get_contents();
					ob_end_clean();
					return $html;
				}
				return;
			}
		]);
	}
}

function add_block_rgdevme_blocks_block_category($categories)
{
	$categories[] = array(
		'slug'  => 'attenne',
		'title' => 'Attenne'
	);
	return $categories;
}


add_filter('block_categories_all', 'add_block_rgdevme_blocks_block_category');
add_action('init', 'create_block_rgdevme_blocks_block_init');
