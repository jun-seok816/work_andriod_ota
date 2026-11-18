CREATE TABLE "api_keys" (
	"id" varchar(255) COLLATE "C" NOT NULL,
	"hash" varchar(64) COLLATE "C" NOT NULL,
	"name" varchar(64) COLLATE "C" NOT NULL,
	"prefix" varchar(16) COLLATE "C" NOT NULL,
	"role" varchar(16) COLLATE "C" NOT NULL,
	"created_at_ms" bigint NOT NULL,
	"revoked_at_ms" bigint,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "api_keys_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "bundle_event_heads" (
	"install_id" varchar(255) COLLATE "C" NOT NULL,
	"id" varchar(36) COLLATE "C" NOT NULL,
	"type" varchar(32) COLLATE "C" NOT NULL,
	"user_id" varchar(255) COLLATE "C",
	"from_release_id" varchar(36) COLLATE "C",
	"from_bundle_id" varchar(36) COLLATE "C",
	"to_release_id" varchar(36) COLLATE "C",
	"to_bundle_id" varchar(36) COLLATE "C" NOT NULL,
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"app_version" text COLLATE "C" NOT NULL,
	"channel" text COLLATE "C" NOT NULL,
	"metadata" jsonb NOT NULL,
	"received_at_ms" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "bundle_event_heads_install_id_pk" PRIMARY KEY("install_id")
);
--> statement-breakpoint
CREATE TABLE "bundle_events" (
	"id" varchar(36) COLLATE "C" NOT NULL,
	"type" varchar(32) COLLATE "C" NOT NULL,
	"install_id" varchar(255) COLLATE "C" NOT NULL,
	"user_id" varchar(255) COLLATE "C",
	"from_release_id" varchar(36) COLLATE "C",
	"from_bundle_id" varchar(36) COLLATE "C",
	"to_release_id" varchar(36) COLLATE "C",
	"to_bundle_id" varchar(36) COLLATE "C" NOT NULL,
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"app_version" text COLLATE "C" NOT NULL,
	"channel" text COLLATE "C" NOT NULL,
	"metadata" jsonb NOT NULL,
	"received_at_ms" bigint NOT NULL,
	"day" bigint,
	"movement_install_id" text COLLATE "C",
	"bundle_ref" jsonb,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "bundle_events_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "bundle_events__byBundle" (
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"channel" text COLLATE "C" NOT NULL,
	"type" varchar(32) COLLATE "C" NOT NULL,
	"bundle_ref" text COLLATE "C" NOT NULL,
	"day" bigint NOT NULL,
	"received_at_ms" bigint NOT NULL,
	"id" varchar(36) COLLATE "C" NOT NULL,
	CONSTRAINT "bundle_events__byBundle_platform_channel_type_bundle_ref_day_received_at_ms_id_pk" PRIMARY KEY("platform","channel","type","bundle_ref","day","received_at_ms","id")
);
--> statement-breakpoint
CREATE TABLE "bundle_patches" (
	"id" varchar(255) COLLATE "C" NOT NULL,
	"bundle_id" varchar(36) COLLATE "C" NOT NULL,
	"base_bundle_id" varchar(36) COLLATE "C" NOT NULL,
	"base_file_hash" text COLLATE "C" NOT NULL,
	"patch_file_hash" text COLLATE "C" NOT NULL,
	"patch_storage_uri" text COLLATE "C" NOT NULL,
	"byte_size" bigint NOT NULL,
	"order_index" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "bundle_patches_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "bundle_totals" (
	"platform_key" varchar(16) COLLATE "C" NOT NULL,
	"_shard" bigint NOT NULL,
	"bundles" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "bundle_totals_platform_key__shard_pk" PRIMARY KEY("platform_key","_shard")
);
--> statement-breakpoint
CREATE TABLE "bundles" (
	"id" varchar(36) COLLATE "C" NOT NULL,
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"git_commit_hash" varchar(255) COLLATE "C",
	"metadata" jsonb NOT NULL,
	"manifest_storage_uri" text COLLATE "C" NOT NULL,
	"manifest_file_hash" text COLLATE "C" NOT NULL,
	"asset_base_storage_uri" text COLLATE "C" NOT NULL,
	"_refs_bundle_patches_bundle_id" bigint DEFAULT 0 NOT NULL,
	"_refs_bundle_patches_base_bundle_id" bigint DEFAULT 0 NOT NULL,
	"_refs_releases_bundle_id" bigint DEFAULT 0 NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "bundles_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "channels" (
	"id" varchar(1408) COLLATE "C" NOT NULL,
	"name" varchar(255) COLLATE "C" NOT NULL,
	"_refs_releases_channel_id" bigint DEFAULT 0 NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "channels_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "insights_builtin_distribution" (
	"channel" text COLLATE "C" NOT NULL,
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"app_version" text COLLATE "C" NOT NULL,
	"release_id" varchar(36) COLLATE "C" NOT NULL,
	"builtin_bundle_id" varchar(36) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"latest_installations" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_builtin_distribution_channel_platform_app_version_release_id_builtin_bundle_id_bucket_start_ms__shard_pk" PRIMARY KEY("channel","platform","app_version","release_id","builtin_bundle_id","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_distribution" (
	"channel" text COLLATE "C" NOT NULL,
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"app_version" text COLLATE "C" NOT NULL,
	"release_id" varchar(36) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"latest_installations" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_distribution_channel_platform_app_version_release_id_bucket_start_ms__shard_pk" PRIMARY KEY("channel","platform","app_version","release_id","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_failures" (
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"channel" text COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"release_id" varchar(36) COLLATE "C" NOT NULL,
	"stage" varchar(16) COLLATE "C" NOT NULL,
	"reason" varchar(64) COLLATE "C" NOT NULL,
	"detail" varchar(160) COLLATE "C" NOT NULL,
	"_shard" bigint NOT NULL,
	"events" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_failures_platform_channel_bucket_start_ms_release_id_stage_reason_detail__shard_pk" PRIMARY KEY("platform","channel","bucket_start_ms","release_id","stage","reason","detail","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_latest_by_bundle" (
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"channel" text COLLATE "C" NOT NULL,
	"bundle_field" varchar(16) COLLATE "C" NOT NULL,
	"bundle_id" varchar(36) COLLATE "C" NOT NULL,
	"type" varchar(32) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"installations" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_latest_by_bundle_platform_channel_bundle_field_bundle_id_type_bucket_start_ms__shard_pk" PRIMARY KEY("platform","channel","bundle_field","bundle_id","type","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_outcomes" (
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"channel" text COLLATE "C" NOT NULL,
	"type" varchar(32) COLLATE "C" NOT NULL,
	"bundle_ref" varchar(41) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"events" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_outcomes_platform_channel_type_bundle_ref_bucket_start_ms__shard_pk" PRIMARY KEY("platform","channel","type","bundle_ref","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_overview" (
	"identity" varchar(32) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"downloads" bigint NOT NULL,
	"failed_launches" bigint NOT NULL,
	"patch_downloads" bigint NOT NULL,
	"patch_fallbacks" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_overview_identity_bucket_start_ms__shard_pk" PRIMARY KEY("identity","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_overview_daily" (
	"identity" varchar(32) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"downloads" bigint NOT NULL,
	"failed_launches" bigint NOT NULL,
	"patch_downloads" bigint NOT NULL,
	"patch_fallbacks" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_overview_daily_identity_bucket_start_ms__shard_pk" PRIMARY KEY("identity","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_overview_lifetime" (
	"identity" varchar(32) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"downloads" bigint NOT NULL,
	"failed_launches" bigint NOT NULL,
	"patch_downloads" bigint NOT NULL,
	"patch_fallbacks" bigint NOT NULL,
	"applies" bigint NOT NULL,
	"failed_updates" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_overview_lifetime_identity_bucket_start_ms__shard_pk" PRIMARY KEY("identity","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_sketches" (
	"identity" varchar(32) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"activity_users" text COLLATE "C",
	"failed_users" text COLLATE "C",
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_sketches_identity_bucket_start_ms__shard_pk" PRIMARY KEY("identity","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_sketches_daily" (
	"identity" varchar(32) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"activity_users" text COLLATE "C",
	"failed_users" text COLLATE "C",
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_sketches_daily_identity_bucket_start_ms__shard_pk" PRIMARY KEY("identity","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "insights_sketches_lifetime" (
	"identity" varchar(32) COLLATE "C" NOT NULL,
	"bucket_start_ms" bigint NOT NULL,
	"_shard" bigint NOT NULL,
	"failed_users" text COLLATE "C",
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "insights_sketches_lifetime_identity_bucket_start_ms__shard_pk" PRIMARY KEY("identity","bucket_start_ms","_shard")
);
--> statement-breakpoint
CREATE TABLE "private_hot_updater_settings" (
	"key" varchar(255) COLLATE "C" NOT NULL,
	"value" varchar(255) COLLATE "C" NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "private_hot_updater_settings_key_pk" PRIMARY KEY("key")
);
--> statement-breakpoint
CREATE TABLE "release_catalogs" (
	"scope_key" varchar(2048) COLLATE "C" NOT NULL,
	"catalog_id" varchar(255) COLLATE "C" NOT NULL,
	"strategy" varchar(16) COLLATE "C" NOT NULL,
	"channel_id" varchar(1408) COLLATE "C" NOT NULL,
	"channel_key" varchar(1400) COLLATE "C" NOT NULL,
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"fingerprint_hash" varchar(255) COLLATE "C",
	"generation" bigint NOT NULL,
	"payload" text COLLATE "C" NOT NULL,
	"catalog_hash" varchar(71) COLLATE "C" NOT NULL,
	"byte_size" bigint NOT NULL,
	"is_tombstone" boolean NOT NULL,
	"updated_at_ms" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "release_catalogs_scope_key_pk" PRIMARY KEY("scope_key")
);
--> statement-breakpoint
CREATE TABLE "releases" (
	"id" varchar(36) COLLATE "C" NOT NULL,
	"revision" bigint NOT NULL,
	"scope_key" varchar(2048) COLLATE "C" NOT NULL,
	"channel_id" varchar(1408) COLLATE "C" NOT NULL,
	"platform" varchar(16) COLLATE "C" NOT NULL,
	"kind" varchar(16) COLLATE "C" NOT NULL,
	"bundle_id" varchar(36) COLLATE "C",
	"strategy" varchar(16) COLLATE "C" NOT NULL,
	"target_app_version" text COLLATE "C",
	"fingerprint_hash" varchar(255) COLLATE "C",
	"enabled" boolean NOT NULL,
	"should_force_update" boolean NOT NULL,
	"message" text COLLATE "C",
	"rollout_cohort_count" bigint NOT NULL,
	"target_cohorts" jsonb NOT NULL,
	"operation" varchar(16) COLLATE "C" NOT NULL,
	"source_release_id" varchar(36) COLLATE "C",
	"created_at_ms" bigint NOT NULL,
	"updated_at_ms" bigint NOT NULL,
	"_v" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "releases_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE INDEX "api_keys_byCreated" ON "api_keys" USING btree ("created_at_ms","id");--> statement-breakpoint
CREATE UNIQUE INDEX "api_keys_hash" ON "api_keys" USING btree ("hash");--> statement-breakpoint
CREATE INDEX "bundle_event_heads_byUser" ON "bundle_event_heads" USING btree ("user_id","install_id");--> statement-breakpoint
CREATE INDEX "bundle_event_heads__retention" ON "bundle_event_heads" USING btree ("received_at_ms","install_id");--> statement-breakpoint
CREATE INDEX "bundle_events_movementsByInstall" ON "bundle_events" USING btree ("movement_install_id","received_at_ms","id");--> statement-breakpoint
CREATE INDEX "bundle_events_byDay" ON "bundle_events" USING btree ("day","received_at_ms","id");--> statement-breakpoint
CREATE UNIQUE INDEX "bundle_patches_pair" ON "bundle_patches" USING btree ("bundle_id","base_bundle_id");--> statement-breakpoint
CREATE INDEX "bundle_patches_byBundle" ON "bundle_patches" USING btree ("bundle_id","order_index","id");--> statement-breakpoint
CREATE INDEX "bundle_patches_byBase" ON "bundle_patches" USING btree ("base_bundle_id","bundle_id","id");--> statement-breakpoint
CREATE INDEX "bundles_byPlatform" ON "bundles" USING btree ("platform","id");--> statement-breakpoint
CREATE INDEX "channels_all" ON "channels" USING btree ("name","id");--> statement-breakpoint
CREATE UNIQUE INDEX "channels_name" ON "channels" USING btree ("name");--> statement-breakpoint
CREATE INDEX "insights_builtin_distribution_byScope" ON "insights_builtin_distribution" USING btree ("channel","platform","bucket_start_ms","app_version","release_id","builtin_bundle_id","_shard");--> statement-breakpoint
CREATE INDEX "insights_builtin_distribution_byVersion" ON "insights_builtin_distribution" USING btree ("channel","platform","app_version","bucket_start_ms","release_id","builtin_bundle_id","_shard");--> statement-breakpoint
CREATE INDEX "insights_builtin_distribution__retention" ON "insights_builtin_distribution" USING btree ("bucket_start_ms","channel","platform","app_version","release_id","builtin_bundle_id","_shard");--> statement-breakpoint
CREATE INDEX "insights_distribution_byScope" ON "insights_distribution" USING btree ("channel","platform","bucket_start_ms","app_version","release_id","_shard");--> statement-breakpoint
CREATE INDEX "insights_distribution_byVersion" ON "insights_distribution" USING btree ("channel","platform","app_version","bucket_start_ms","release_id","_shard");--> statement-breakpoint
CREATE INDEX "insights_distribution__retention" ON "insights_distribution" USING btree ("bucket_start_ms","channel","platform","app_version","release_id","_shard");--> statement-breakpoint
CREATE INDEX "insights_failures__retention" ON "insights_failures" USING btree ("bucket_start_ms","platform","channel","release_id","stage","reason","detail","_shard");--> statement-breakpoint
CREATE INDEX "insights_latest_by_bundle__retention" ON "insights_latest_by_bundle" USING btree ("bucket_start_ms","platform","channel","bundle_field","bundle_id","type","_shard");--> statement-breakpoint
CREATE INDEX "insights_outcomes__retention" ON "insights_outcomes" USING btree ("bucket_start_ms","platform","channel","type","bundle_ref","_shard");--> statement-breakpoint
CREATE INDEX "insights_overview__retention" ON "insights_overview" USING btree ("bucket_start_ms","identity","_shard");--> statement-breakpoint
CREATE INDEX "insights_overview_daily__retention" ON "insights_overview_daily" USING btree ("bucket_start_ms","identity","_shard");--> statement-breakpoint
CREATE INDEX "insights_sketches__retention" ON "insights_sketches" USING btree ("bucket_start_ms","identity","_shard");--> statement-breakpoint
CREATE INDEX "insights_sketches_daily__retention" ON "insights_sketches_daily" USING btree ("bucket_start_ms","identity","_shard");--> statement-breakpoint
CREATE INDEX "releases_byScope" ON "releases" USING btree ("scope_key","id");--> statement-breakpoint
CREATE INDEX "releases_byScopeEnabled" ON "releases" USING btree ("scope_key","enabled","id");--> statement-breakpoint
CREATE INDEX "releases_byChannelPlatform" ON "releases" USING btree ("channel_id","platform","id");--> statement-breakpoint
CREATE INDEX "releases_byChannelPlatformEnabled" ON "releases" USING btree ("channel_id","platform","enabled","id");--> statement-breakpoint
CREATE INDEX "releases_byBundle" ON "releases" USING btree ("bundle_id","id");