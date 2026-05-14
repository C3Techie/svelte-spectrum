<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Float, Wobble } from '@threlte/extras';

	let rotation = $state(0);
	useTask(({ delta }) => {
		rotation += delta * 0.2;
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 10]}
	fov={45}
/>

<T.DirectionalLight position={[10, 10, 10]} intensity={1.5} color="#00e5ff" />
<T.AmbientLight intensity={0.5} />

<Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
	<T.Mesh rotation.y={rotation}>
		<T.IcosahedronGeometry args={[2, 20]} />
		<T.MeshStandardMaterial
			color="#00daf3"
			wireframe
			transparent
			opacity={0.3}
			emissive="#00daf3"
			emissiveIntensity={0.4}
		/>
		<Wobble speed={2} factor={0.4} frequency={1} noise={0.3} shadow={false} />
	</T.Mesh>
</Float>

<T.Mesh position={[5, -2, -5]}>
	<T.SphereGeometry args={[1, 32, 32]} />
	<T.MeshStandardMaterial color="#cdbdff" transparent opacity={0.1} />
</T.Mesh>
