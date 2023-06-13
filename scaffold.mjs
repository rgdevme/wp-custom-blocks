import { writeFileSync, existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const questions = [
	{
		type: 'input',
		name: 'name',
		message: 'Module name?'
	},
	{
		type: 'input',
		name: 'desc',
		message: 'Description?'
	}
]

const domain = 'rgdevme'
const src = __dirname + '/src/blocks'
const initialBlockJson = {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 2,
	title: '',
	name: '',
	textdomain: '',
	version: '0.1.0',
	category: 'attenne',
	icon: 'align-full-width',
	keywords: ['attane', 'gd', 'condor'],
	description: '',
	supports: {
		className: false
	},
	editorScript: 'file:./index.js',
	editorStyle: 'file:./index.css',
	style: 'file:./style-index.css',
	render: 'file:./render.php',
	attributes: {}
}

inquirer.prompt(questions).then(async answers => {
	const lowercased = answers.name.toLowerCase().trim().replace(/ /g, '-')
	const route = `${src}/${lowercased}`
	if (existsSync(route)) {
		console.log(
			'Folder already exists. For security reasons, please delete it manually'
		)
		return
	}

	mkdirSync(route)

	const first = lowercased[0].toUpperCase()
	const rest = lowercased.slice(1).replace(/-/g, ' ')

	initialBlockJson.textdomain = lowercased
	initialBlockJson.name = `${domain}/${lowercased}`
	initialBlockJson.title = first + rest
	initialBlockJson.description = answers.description

	writeFileSync(
		`${route}/block.json`,
		JSON.stringify(initialBlockJson, null, '\t')
	)
	writeFileSync(
		`${route}/editor.scss`,
		`/**
* The following styles get applied inside the editor only.
*/

@import url(../../scss/editor.scss);

.wp-block-${domain}-${lowercased} {
}`
	)

	writeFileSync(
		`${route}/style.scss`,
		`/**
* The following styles get applied both on the front of your site
* and in the editor.
*/

@import url(../../scss/style.scss);

.wp-block-${domain}-${lowercased} {
}`
	)

	writeFileSync(
		`${route}/edit.js`,
		`import { __ } from '@wordpress/i18n'
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { PanelBody, TextControl } from '@wordpress/components'
import './editor.scss'

export default ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps()
	const className = blockProps.className + ' wp-block-rgdevme container'
	
	const {} = attributes

  console.log({ blockProps, attributes })

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('...')} initialOpen>
          <TextControl
            value={title}
            onChange={v => setAttributes({ title: v })}
            label='Title'
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps} className={className}>
        {/* CODE GOES HERE */}
      </div>
    </Fragment>
  )
}`
	)

	writeFileSync(
		`${route}/index.js`,
		`import { registerBlockType } from '@wordpress/blocks'
import edit from './edit'
import metadata from './block.json'
import './style.scss'

registerBlockType(metadata.name, { edit })`
	)

	writeFileSync(
		`${route}/render.php`,
		`<?php if (!empty($attributes)) { ?>
	<div <?= get_block_wrapper_attributes(['class' => "container wp-block-${domain}-${lowercased}"]) ?>>
  	<!-- CODE GOES HERE... -->
	</div>
<?php } ?>`
	)

	console.log(
		'Done-zo! Please add the name of the package to the $blocks array in gd-con-blocks.php'
	)
})
