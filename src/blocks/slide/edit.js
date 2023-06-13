import { __ } from '@wordpress/i18n'
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components'
import './editor.scss'

export default ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps()
	const className = blockProps.className + ' wp-block-rgdevme container'

	const {} = attributes

	console.log({ blockProps, attributes })

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Slide options')} initialOpen>
					<TextControl
						value={author}
						onChange={v => setAttributes({ author: v })}
						label='Author'
					/>
					<TextareaControl
						value={testimonial}
						onChange={v => setAttributes({ testimonial: v })}
						label='Testimonial'
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className={className}>
				{/* CODE GOES HERE */}
			</div>
		</Fragment>
	)
}
