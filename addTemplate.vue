<template>
	<space-dialog
		:visible.sync="dialogVisible"
		center
		:title="`承诺内容模版${dialogTitle}`"
		width="800px"
		:before-close="cancel"
	>
		<template v-if="handleType === 'detail'">
			<div class="detail-row detail-title">
				<label>模版名称：</label>
				{{ form.title }}
			</div>
			<div class="detail-row"><label>承诺内容：</label></div>
			<div class="detail-content" v-html="form.commitmentContent"></div>
		</template>
		<template v-else>
			<SpaceForm ref="spaceForm" :model="form" :rules="rules" :form-items="baseSettingsFormItems">
				<template #commitmentContentInput>
					<RichText
						ref="richTextRef"
						v-model="form.commitmentContent"
						:max-length="5000"
						:height="400"
						placeholder="请输入内容"
						@change="handleRichTextChange"
					/>
				</template>
			</SpaceForm>
		</template>
		<template #footer>
			<el-button v-if="handleType !== 'detail'" type="primary" :loading="submitLoading" @click="submit">
				保 存
			</el-button>
			<el-button @click="cancel">{{ handleType === 'detail' ? '关 闭' : '取 消' }}</el-button>
		</template>
	</space-dialog>
</template>
<script>
import * as api from '@/views/SecurityManager/api/CardManagement';
import RichText from '@/components/RichText/index.vue';

export default {
	name: 'AddTemplate',
	components: { RichText },
	props: {},
	data() {
		return {
			dialogVisible: false,
			dialogTitle: '',
			handleType: '',
			submitLoading: false,
			form: {
				title: '',
				commitmentContent: ''
			},
			rules: {
				title: [{ required: true, message: '请输入模版名称', trigger: 'change' }],
				commitmentContent: [{ required: true, message: '请输入承诺内容', trigger: 'change' }]
			},
			baseSettingsFormItems: [
				{
					label: '模版名称',
					prop: 'title',
					span: 24,
					type: 'input',
					attrs: {
						placeholder: '请输入模版名称',
						maxLength: 100,
						showWordLimit: true
					}
				},
				{
					label: '承诺内容',
					prop: 'commitmentContent',
					span: 24,
					slotInput: true
				}
			]
		};
	},
	methods: {
		openDialog(type, row = null) {
			this.handleType = type;
			this.dialogTitle = type === 'add' ? '新增' : type === 'edit' ? '编辑' : '详情';
			this.dialogVisible = true;

			if (row) {
				this.form = { ...this.form, ...row };
				if (type === 'edit') {
					this.$nextTick(() => {
						this.$refs.richTextRef?.blurEditor();
					});
				}
			} else {
				this.form = {
					title: '',
					commitmentContent: ''
				};
			}
		},
		// 提交
		submit() {
			this.$refs.spaceForm.validate(val => {
				if (!val) return;
				this.submitLoading = true;
				const param = {
					...this.form
				};
				api
					.editTemplate(param)
					.then(res => {
						if (res.returnCode == 200) {
							this.$message.success('操作成功');
						}
						this.cancel();
						this.$emit('success');
						this.submitLoading = false;
					})
					.catch(() => {
						this.submitLoading = false;
					});
			});
		},
		cancel() {
			this.dialogVisible = false;
			this.form = {
				title: '',
				commitmentContent: ''
			};
		},
		// 富文本内容变化时，手动触发表单验证
		handleRichTextChange() {
			this.$nextTick(() => {
				if (this.$refs.spaceForm && this.$refs.spaceForm.$refs.form) {
					this.$refs.spaceForm.$refs.form.validateField('commitmentContent');
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.detail-row {
	padding-bottom: 10px;
	label {
		font-weight: bold;
	}
}

.detail-title {
	margin-bottom: 30px;
}
.detail-content {
	height: 400px;
	overflow: auto;
}
</style>
