import { __ } from '@wordpress/i18n'
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { PanelBody, RangeControl } from '@wordpress/components'
import './editor.scss'

export default ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps()
	const className = blockProps.className + ' wp-block-rgdevme'

	const { size } = attributes

	console.log({ blockProps, attributes })

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('...')} initialOpen>
					<RangeControl
						value={size}
						onChange={v => setAttributes({ size: v })}
						help={`Please adjust the divider's size`}
						initialPosition={80}
						label='Size'
						max={300}
						min={1}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className={className} />
		</Fragment>
	)
}
