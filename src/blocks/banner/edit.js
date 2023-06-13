import { __ } from '@wordpress/i18n'
import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import {
	PanelBody,
	Button,
	ResponsiveWrapper,
	TextControl,
	ToggleControl,
	SelectControl,
	Spinner
} from '@wordpress/components'
import { compose } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'
import './editor.scss'

const ALLOWED_MEDIA_TYPES = ['image']

const Banner = ({ attributes, setAttributes, bgmedia }) => {
	const blockProps = useBlockProps()
	const {
		bgmediaID,
		title,
		text,
		ctatext,
		ctalink,
		ctatarget,
		ctastyle,
		layout,
		appearance
	} = attributes

	const styles = {}
	if (bgmedia && bgmedia.source_url) {
		styles.backgroundImage = `url(${bgmedia.source_url})`
	}

	const className = `${blockProps.className} wp-block-rgdevme`

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Texts settings')} initialOpen>
					<SelectControl
						value={layout}
						onChange={v => setAttributes({ layout: v })}
						options={[{ label: 'CTA Right', value: 'cta-right' }]}
						label='Layout'
					/>
					<TextControl
						value={title}
						onChange={v => setAttributes({ title: v })}
						label='Title'
					/>
					<TextControl
						value={text}
						onChange={v => setAttributes({ text: v })}
						label='Content'
					/>
					<SelectControl
						value={appearance}
						onChange={v => setAttributes({ appearance: v })}
						options={[
							{ label: 'Clear', value: 'clear' },
							{ label: 'Dark', value: 'dark' }
						]}
						label='Appearance'
					/>
				</PanelBody>
				<PanelBody title={__('CTA Settings')}>
					<TextControl
						value={ctatext}
						onChange={v => setAttributes({ ctatext: v })}
						label='CTA Text'
					/>
					<TextControl
						value={ctalink}
						onChange={v => setAttributes({ ctalink: v })}
						label='CTA Link'
					/>
					<ToggleControl
						checked={ctatarget}
						onChange={() => setAttributes({ ctatarget: !ctatarget })}
						label='Open CTA in another window'
					/>
					<SelectControl
						value={ctastyle}
						onChange={v => setAttributes({ ctastyle: v })}
						defaultValue={'default'}
						options={[
							{ label: 'Default', value: 'default' },
							{ label: 'Outline', value: 'outline' },
							{ label: 'Dark', value: 'dark' }
						]}
						label='CTA Style'
					/>
				</PanelBody>
				<PanelBody title={__('Background settings', 'image-selector-example')}>
					<div className='wp-block-image-selector-example-image'>
						<MediaUploadCheck
							fallback={
								<p>
									{__(
										'To edit the background image, you need permission to upload media.',
										'image-selector-example'
									)}
								</p>
							}>
							<MediaUpload
								title={__('Background image', 'image-selector-example')}
								onSelect={image => setAttributes({ bgmediaID: image.id })}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={bgmedia}
								render={({ open }) => (
									<Button
										className={
											!bgmediaID
												? 'editor-post-featured-image__toggle'
												: 'editor-post-featured-image__preview'
										}
										onClick={open}>
										{!bgmediaID &&
											__('Set background image', 'image-selector-example')}
										{!!bgmediaID && !bgmedia && <Spinner />}
										{!!bgmediaID && bgmedia && (
											<ResponsiveWrapper
												naturalWidth={bgmedia.media_details.width}
												naturalHeight={bgmedia.media_details.height}>
												<img
													src={bgmedia.source_url}
													alt={__('Background image', 'image-selector-example')}
												/>
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						{!!bgmediaID && bgmedia && (
							<MediaUploadCheck>
								<MediaUpload
									title={__('Background image', 'image-selector-example')}
									onSelect={image => setAttributes({ bgmediaID: image.id })}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={bgmediaID}
									render={({ open }) => (
										<Button onClick={open} isDefault isLarge>
											{__('Replace background image', 'image-selector-example')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}

						{!!bgmediaID && (
							<MediaUploadCheck>
								<Button
									onClick={() => setAttributes({ bgmediaID: undefined })}
									isLink
									isDestructive>
									{__('Remove background image', 'image-selector-example')}
								</Button>
							</MediaUploadCheck>
						)}
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className={className}>
				<div style={styles} data-layout={layout} data-appearance={appearance}>
					{title !== '' && <h3 className='rgdevme-banner-title'>{title}</h3>}
					{text !== '' && <p className='rgdevme-banner-text'>{text}</p>}
					{ctalink !== '' && ctatext !== '' && (
						<div
							class={[
								'rgdevme-banner-cta wp-block-button',
								ctastyle === 'outline'
									? 'btn-outline'
									: ctastyle === 'dark'
									? 'btn-dark'
									: ''
							]
								.filter(x => x !== '')
								.join(' ')}>
							<a
								className='wp-block-button__link'
								href={ctalink}
								target={ctatarget ? '_blank' : '_self'}>
								{ctatext}
							</a>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	)
}

export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core')
		const { bgmediaID } = props.attributes
		return {
			bgmedia: bgmediaID ? getMedia(bgmediaID) : null
		}
	})
)(Banner)
